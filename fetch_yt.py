import sys
from youtube_transcript_api import YouTubeTranscriptApi

def get_transcript(video_id, output_path):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = " ".join([entry['text'] for entry in transcript])
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(text)
        print(f"Successfully saved transcript for {video_id} to {output_path}")
    except Exception as e:
        print(f"Error fetching transcript for {video_id}: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python fetch_yt.py <video_id> <output_path>")
        sys.exit(1)
    
    get_transcript(sys.argv[1], sys.argv[2])
