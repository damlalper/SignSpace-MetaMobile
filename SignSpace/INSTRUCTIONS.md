# SignSpace - Project Setup & Instructions

## 🚀 Getting Started

1.  **Install Dependencies**:
    ```bash
    cd SignSpace
    npm install
    ```

2.  **Run on Android**:
    ```bash
    npx react-native run-android
    ```
    *Make sure your Meta Quest 3 is connected and recognized via `adb devices`.*

## 📂 Project Structure

-   `src/components/GhostHand.tsx`: The 3D Hand component. Currently renders a **Box**. To use a real model:
    1.  Place your `hand.glb` in `src/assets/models/`.
    2.  Uncomment the `useGLTF` code in `GhostHand.tsx` (you will need to modify the component to load the GLB).
-   `src/hooks/useHandTracking.ts`: Mock hand tracking. Replace this with the actual Meta Spatial SDK hook or `react-native-vision-camera` logic.
-   `src/services/aiService.ts`: Mock Object Recognition. Replace `identifyObject` with a real API call to OpenAI or Gemini.
-   `src/screens/LessonScreen.tsx`: The main learning screen.

## 🛠️ How to Replace Mocks

### 1. 3D Model
-   Go to `src/assets/models/`.
-   Add your `hand.glb` file.
-   Update `src/components/GhostHand.tsx` to load the model:
    ```javascript
    import { useGLTF } from '@react-three/drei';
    // ...
    const { scene } = useGLTF(require('../assets/models/hand.glb'));
    return <primitive object={scene} />;
    ```

### 2. Hand Tracking (Advanced)
-   **Native Module**: I have created a custom Native Module (`HandTrackingModule.java`) that bridges React Native to the Android layer.
-   **Current State**: The module currently emits *simulated* joint data to allow testing without the headset.
-   **Real Integration**: To use the actual Meta Spatial SDK:
    1.  Download the **Meta OpenXR Mobile SDK** or **Oculus Mobile SDK**.
    2.  Add the `.aar` files to `android/app/libs/`.
    3.  Update `android/app/build.gradle` to include these libs.
    4.  Modify `HandTrackingModule.java` to initialize the OpenXR session and query `xrLocateHandJointsEXT`.

### 3. AI Object Recognition
-   In `src/services/aiService.ts`, implement the actual API call.
-   You can use `fetch` to send the Base64 image to an endpoint.

## 📱 Passthrough
-   Passthrough is enabled in `AndroidManifest.xml`.
-   The app background is set to `transparent` to allow seeing the real world.
