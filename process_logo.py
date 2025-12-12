
from PIL import Image, ImageOps, ImageDraw

def process_logo():
    input_path = "client/public/sagedo_logo_black.png"
    output_path = "client/public/sagedo_logo_final_circle.png"
    
    try:
        # Open the image (RGBA)
        img = Image.open(input_path).convert("RGBA")
        width, height = img.size
        
        # Create a circular mask
        mask = Image.new('L', (width, height), 0)
        draw = ImageDraw.Draw(mask)
        
        # Draw white circle in the center (defining the visible area)
        # We assume the logo is centered. We make the circle slightly smaller (e.g., 95%) 
        # to crop out any potential edge artifacts.
        center_x, center_y = width // 2, height // 2
        radius = min(width, height) // 2
        
        # Contract radius slightly to be safe (remove outer edge artifacts)
        safe_radius = int(radius * 0.98) 
        
        draw.ellipse((center_x - safe_radius, center_y - safe_radius, 
                      center_x + safe_radius, center_y + safe_radius), fill=255)
        
        # Apply the mask to the alpha channel of the image
        # This makes everything outside the circle 100% transparent
        result = img.copy()
        result.putalpha(mask)
        
        # OPTIONAL: Replace Pure Black with Transparent?
        # Let's be careful. The user likes the "Dark Grey" ring.
        # Deep blacks inside the ring might be intentional contrast.
        # But the corners are DEFINITELY gone now.
        
        result.save(output_path)
        print(f"Success! Saved circular clipped logo to {output_path}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    process_logo()
