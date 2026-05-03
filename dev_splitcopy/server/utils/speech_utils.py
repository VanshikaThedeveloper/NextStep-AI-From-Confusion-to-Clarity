import os
import io
import tempfile
import speech_recognition as sr
import subprocess
import shutil



async def speech_to_text(audio_file) -> str:
    """Convert uploaded audio file to text using Google Speech Recognition.

    Handles multiple audio formats (webm, ogg, wav, etc.) by converting
    to WAV via pydub when the raw file isn't directly readable by
    SpeechRecognition.
    """
    temp_path = None
    converted_path = None

    try:
        contents = await audio_file.read()

        if not contents or len(contents) < 100:
            return "[No audio detected — please try recording again]"

        # Save uploaded audio to a temp file
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp:
            temp.write(contents)
            temp_path = temp.name

        # --- Attempt 1: Convert via pydub (handles webm/ogg/mp4/etc.) ---
        wav_path = temp_path
        
        # Check if ffmpeg is available if we need conversion
        ffmpeg_available = shutil.which("ffmpeg") is not None
        
        try:
            from pydub import AudioSegment

            if not ffmpeg_available:
                # If it's a webm but no ffmpeg, this will fail in pydub/sr
                # We can't do much but we'll try to catch it earlier
                pass

            audio_segment = AudioSegment.from_file(io.BytesIO(contents))

            converted = tempfile.NamedTemporaryFile(
                delete=False, suffix=".wav"
            )
            converted_path = converted.name
            converted.close()

            audio_segment.export(converted_path, format="wav")
            wav_path = converted_path
        except ImportError:
            # pydub not installed — fallback to raw file
            pass
        except Exception as e:
            # If conversion failed and it's likely due to missing ffmpeg
            if not ffmpeg_available:
                raise RuntimeError("FFmpeg is not installed on the server. Please install FFmpeg to process voice recordings.")
            # Other conversion failure — try raw file anyway
            pass

        # --- Recognise speech from the WAV file ---
        recognizer = sr.Recognizer()
        recognizer.energy_threshold = 300
        recognizer.dynamic_energy_threshold = True

        try:
            with sr.AudioFile(wav_path) as source:
                audio = recognizer.record(source)
            text = recognizer.recognize_google(audio)
            return text if text and text.strip() else "[Could not understand audio — please try again]"
        except Exception as e:
            if not ffmpeg_available:
                raise RuntimeError("Speech processing failed because FFmpeg is missing. Server cannot convert audio format.")
            raise e


    except sr.UnknownValueError:
        return "[Could not understand audio — please speak clearly and try again]"
    except sr.RequestError as e:
        raise RuntimeError(f"Speech recognition service error: {str(e)}")
    except Exception as e:
        raise RuntimeError(f"Speech processing failed: {str(e)}")
    finally:
        # Clean up ALL temp files
        for path in (temp_path, converted_path):
            if path and os.path.exists(path):
                try:
                    os.unlink(path)
                except OSError:
                    pass