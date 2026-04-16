import sys
import re

def clean(f_in, f_out):
    with open(f_in, 'r', encoding='utf-8') as fin, open(f_out, 'w', encoding='utf-8') as fout:
        lines = fin.readlines()
        text = []
        for line in lines:
            if '-->' in line or line.startswith('WEBVTT') or line.startswith('Kind:') or line.startswith('Language:') or not line.strip() or line.strip().isdigit():
                continue
            cleaned = re.sub(r'<[^>]+>', '', line)
            # handle aligning duplicate texts due to youtube VTT format
            if cleaned.strip():
                text.append(cleaned.strip())
        
        # Deduplicate sequential lines
        final_text = []
        last_line = ""
        for t in text:
            if t != last_line:
                final_text.append(t)
                last_line = t
                
        fout.write(' '.join(final_text).replace('\n', ' '))

clean(sys.argv[1], sys.argv[2])
