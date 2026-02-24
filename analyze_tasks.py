import re
import io

file_path = r"c:\Users\admin\sagedo-website\master_chat_history.md"

try:
    with io.open(file_path, "r", encoding="utf-8", errors="replace") as f:
        content = f.read()
        
    # Count task list items in markdown
    total_tasks = len(re.findall(r'(?:^|\n)\s*-\s*\[[xX\s/]\]', content))
    completed_tasks = len(re.findall(r'(?:^|\n)\s*-\s*\[[xX]\]', content))
    
    # We can also count "USER Objective:" blocks or occurrences of instructions
    # Count how many AI responses or tasks were executed.
    
    # Let's count the number of task checkboxes specifically.
    print(f"Total Checklist Tasks Found: {total_tasks}")
    print(f"Completed Checklist Tasks: {completed_tasks}")
    
    # To estimate "done asking 1 time", we can look for words indicative of correction:
    # "no", "that's wrong", "fix this", "error", "failed", "try again", "not exactly"
    # in the user's prompts, vs positive completions.
    # Since we don't have the raw chat transcripts, only the structural logs, we can
    # look at the number of task boundaries/log entries.
    
    print("Analysis complete.")
except Exception as e:
    print(f"Error: {e}")
