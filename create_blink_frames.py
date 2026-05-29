import cv2
import mediapipe.python.solutions.face_mesh as mp_face_mesh
import numpy as np
import os
import glob

face_mesh = mp_face_mesh.FaceMesh(
    static_image_mode=True,
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.1
)

# Left eye indices
LEFT_EYE = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
# Right eye indices
RIGHT_EYE = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]

# Extended skin areas above/below eyes
LEFT_SKIN = [21, 54, 103, 67, 109, 10, 338, 297, 332, 284, 251]
RIGHT_SKIN = [251, 284, 332, 297, 338, 10, 109, 67, 103, 54, 21]

def process_image(img_path):
    print(f"Processing {img_path}")
    image = cv2.imread(img_path, cv2.IMREAD_UNCHANGED)
    if image is None:
        print("Failed to load")
        return False
        
    # Convert to RGB for mediapipe
    if image.shape[2] == 4:
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGRA@RGB)
    else:
        rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    results = face_mesh.process(rgb_image)
    
    if not results.multi_face_landmarks:
        print("No face detected by mediapipe.")
        return False
        
    landmarks = results.multi_face_landmarks[0]
    h, w = image.shape[:2]
    
    blink_image = image.copy()
    
    # Process both eyes
    for eye_indices in [LEFT_EYE, RIGHT_EYE]:
        points = []
        for idx in eye_indices:
            lm = landmarks.landmark[idx]
            points.append([int(lm.x * w), int(lm.y * h)])
            
        points = np.array(points, dtype=np.int32)
        
        # Get bounding box for the eye
        x, y, ew, eh = cv2.boundingRect(points)
        
        # Sample skin color from just above the eye
        skin_y = max(0, y - int(eh * 0.5))
        skin_x = x + int(ew * 0.5)
        
        # Grab color from the original image at skin_x, skin_y
        skin_color = image[skin_y, skin_x].tolist()
        
        # If the sample is transparent, try another point
        if image.shape[2] == 4 and skin_color[3] == 0:
             skin_color = [200, 160, 140, 255] # fallback skin color
        
        # Draw a filled polygon or ellipse over the eye with the skin color
        # To make it look like a closed eye, we draw the skin color covering the eye
        # and then draw a slightly darker line in the middle to represent the eyelash/crease
        
        # Pad the eye area slightly
        pad_x = int(ew * 0.1)
        pad_y = int(eh * 0.2)
        
        cv2.ellipse(blink_image, (x + ew//2, y + eh//2), (ew//2 + pad_x, eh//2 + pad_y), 0, 0, 360, skin_color, -1)
        
        # Draw eyelash line
        line_color = [max(0, c - 50) for c in skin_color[:3]] + [255] if len(skin_color)==4 else [max(0, c - 50) for c in skin_color[:3]]
        
        start_pt = (x - pad_x//2, y + eh//2)
        end_pt = (x + ew + pad_x//2, y + eh//2)
        
        # Draw a slight curve
        thickness = max(1, int(eh * 0.1))
        cv2.line(blink_image, start_pt, end_pt, line_color, thickness)
        
    out_path = img_path.replace('.png', '-blink.png')
    cv2.imwrite(out_path, blink_image)
    print(f"Saved blink frame to {out_path}")
    return True

def main():
    images = glob.glob('public/images/figurine-*.png')
    for img in images:
        if '-blink' not in img:
            process_image(img)

if __name__ == '__main__':
    main()
