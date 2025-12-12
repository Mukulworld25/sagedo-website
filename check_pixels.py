
from PIL import Image

def check_corners():
    path = "client/public/sagedo_logo_final_circle.png"
    img = Image.open(path).convert("RGBA")
    width, height = img.size
    
    # Check 4 corners
    corners = [
        (0, 0),
        (width-1, 0),
        (0, height-1),
        (width-1, height-1)
    ]
    
    print(f"Checking {path} ({width}x{height}) for transparency at corners:")
    
    all_transparent = True
    for x, y in corners:
        r, g, b, a = img.getpixel((x, y))
        print(f"Pixel at ({x}, {y}): R={r} G={g} B={b} Alpha={a}")
        if a != 0:
            all_transparent = False
            
    if all_transparent:
        print("\n✅ VERIFIED: All corners are 100% transparent (Alpha=0). The box is gone.")
    else:
        print("\n❌ FAILED: Some corners are visible!")

if __name__ == "__main__":
    check_corners()
