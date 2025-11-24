import { useState, useEffect } from 'react';
import { NativeModules, NativeEventEmitter } from 'react-native';

const { HandTrackingModule } = NativeModules;

export interface Joint {
    name: string;
    position: { x: number; y: number; z: number };
    rotation: { x: number; y: number; z: number; w: number };
}

export interface HandData {
    joints: Record<string, Joint>;
    isVisible: boolean;
}

export const useHandTracking = () => {
    const [handData, setHandData] = useState<HandData>({
        joints: {},
        isVisible: false,
    });

    useEffect(() => {
        if (!HandTrackingModule) {
            console.warn('HandTrackingModule is not linked. Using mock data.');
            return;
        }

        const eventEmitter = new NativeEventEmitter(HandTrackingModule);

        // Start native tracking
        HandTrackingModule.startTracking();

        const subscription = eventEmitter.addListener('onHandTrackingUpdate', (event: any) => {
            setHandData({
                isVisible: event.isVisible,
                joints: event.joints, // Ensure native module sends data in this structure
            });
        });

        return () => {
            subscription.remove();
            HandTrackingModule.stopTracking();
        };
    }, []);

    return handData;
};
