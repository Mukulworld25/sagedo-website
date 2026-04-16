import re
import sys

def clean_vtt(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove WEBVTT header, timestamps, and tags like <c>
    lines = content.split('\n')
    cleaned_lines = []
    
    last_line = ""
    for line in lines:
        if 'WEBVTT' in line or 'Kind:' in line or 'Language:' in line:
            continue
        if re.match(r'^\d{2}:\d{2}:\d{2}\.\d{3} -->', line):
            continue
        
        # Remove tags like <c>...</c>, <00:00:00.000>
        clean_line = re.sub(r'<[^>]+>', '', line).strip()
        
        # sometimes yt-dlp auto-subs repeat the same line multiple times, only keep unique in sequence
        if clean_line and clean_line != last_line and not clean_line.isspace():
            cleaned_lines.append(clean_line)
            last_line = clean_line

    text = ' '.join(cleaned_lines)
    
    # Simple deduplication of rolling text by checking overlap (approximate for auto-subs)
    words = text.split()
    final_words = []
    for w in words:
        if not final_words or final_words[-1] != w:
            final_words.append(w)
            
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(' '.join(final_words))


