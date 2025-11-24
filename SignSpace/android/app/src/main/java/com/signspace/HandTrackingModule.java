package com.signspace;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Timer;
import java.util.TimerTask;

public class HandTrackingModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private Timer timer;

    HandTrackingModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName() {
        return "HandTrackingModule";
    }

    @ReactMethod
    public void startTracking() {
        // In a real implementation, this would initialize the Meta Spatial SDK / OpenXR session
        // and start listening for hand joint updates.
        
        // Simulating data stream for now
        if (timer != null) {
            timer.cancel();
        }
        timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                sendHandData();
            }
        }, 0, 100); // 10Hz update
    }

    @ReactMethod
    public void stopTracking() {
        if (timer != null) {
            timer.cancel();
            timer = null;
        }
        // Tear down SDK session
    }

    private void sendHandData() {
        if (reactContext.hasActiveCatalystInstance()) {
            WritableMap params = Arguments.createMap();
            params.putBoolean("isVisible", true);
            
            WritableMap joints = Arguments.createMap();
            // Mocking joint data - in real app, populate from SDK
            joints.putMap("wrist", createJoint(0, 0, -0.5f));
            joints.putMap("index_tip", createJoint(0.1f, 0.2f, -0.5f));
            
            params.putMap("joints", joints);

            reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("onHandTrackingUpdate", params);
        }
    }

    private WritableMap createJoint(float x, float y, float z) {
        WritableMap joint = Arguments.createMap();
        WritableMap position = Arguments.createMap();
        position.putDouble("x", x);
        position.putDouble("y", y);
        position.putDouble("z", z);
        joint.putMap("position", position);
        return joint;
    }
}
