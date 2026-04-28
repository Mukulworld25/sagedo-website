import os
import io

ids = [
    ("d53f7b3c-faa3-4820-bc9b-e87950f9250f", "Supabase Migration and Anti-Abuse"),
    ("765f64f5-1497-440a-9c07-79b4828968b2", "Website Content Sanitization"),
    ("f761d7a1-a6f7-471c-a8b5-f4377ba4a5ba", "Fixing Login & Email"),
    ("e4a6ef0e-e5f5-49b0-a303-33adcbdc399a", "Mobile App Data Check"),
    ("7a1580a7-53d9-4afc-97d2-ecb44b553941", "Implementing Core UX Features"),
    ("9bf4b267-8b0d-4fe6-8760-8ccc9825e523", "Chatbot Refinement and Project Finalization"),
    ("64a5fbe9-a65e-40ca-9b59-a98f344b599e", "App Launch Readiness Audit"),
    ("1bdacb7c-c6e0-4eef-aa21-d92bc3bbceec", "Fixing Survey Persistence"),
    ("7c7196c1-6dd2-4922-a7b2-5cfdb12992e7", "Local AI Strategy Pivot"),
    ("b99749b8-3783-499a-b6ad-ca0740fc000c", "Website Revert & Crash Fix"),
    ("fed41dbb-b9cc-4390-a7ae-2c3fbc02837a", "File and Directory Review"),
    ("8ebab65a-5642-4652-8720-74de3e702000", "Master Reference Expansion"),
    ("724ac961-c232-44fd-97af-8ceaaa359713", "Verifying Service Data Integrity"),
    ("3d424e5a-289e-46e7-919d-547f71e9c485", "Fixing Bundle Error")
]

brain_dir = r"C:\Users\admin\.gemini\antigravity\brain"
output_file = r"c:\Users\admin\sagedo-website\master_chat_history.md"

with io.open(output_file, "w", encoding="utf-8") as out:
    out.write("# MASTER KNOWLEDGE BASE & COMPLETE CHAT HISTORY\n\n")
    out.write("This document is the absolute source of truth for all code, decisions, and history across the last 14 sessions. It contains the raw logs, plans, and artifacts.\n\n")
    
    for cid, title in ids:
        out.write(f"\n\n{'='*80}\n")
        out.write(f"# {title}\n")
        out.write(f"Conversation ID: {cid}\n")
        out.write(f"{'='*80}\n\n")
        
        conv_dir = os.path.join(brain_dir, cid)
        if not os.path.exists(conv_dir):
            out.write(f"*Directory not found for this conversation: {conv_dir}*\n")
            continue
            
        out.write("## 1. Generated Artifacts & Plans\n\n")
        for item in os.listdir(conv_dir):
            item_path = os.path.join(conv_dir, item)
            if os.path.isfile(item_path) and item_path.endswith('.md'):
                out.write(f"### File: {item}\n")
                out.write("```markdown\n")
                try:
                    with io.open(item_path, "r", encoding="utf-8", errors="replace") as f:
                        out.write(f.read())
                except Exception as e:
                    pass
                out.write("\n```\n\n")
                
        out.write("## 2. Raw Execution Logs & Chat Transcripts\n\n")
        logs_dir = os.path.join(conv_dir, ".system_generated", "logs")
        if os.path.exists(logs_dir):
            files = sorted(os.listdir(logs_dir))
            for item in files:
                item_path = os.path.join(logs_dir, item)
                if os.path.isfile(item_path):
                    out.write(f"### Log: {item}\n")
                    out.write("```text\n")
                    try:
                        with io.open(item_path, "r", encoding="utf-8", errors="replace") as f:
                            out.write(f.read().replace('```', '` ` `')) # prevent markdown escape
                    except Exception as e:
                        pass
                    out.write("\n```\n\n")
        else:
            out.write("*No system logs directory found.*\n\n")

print(f"Successfully compiled massive history into {output_file}")
