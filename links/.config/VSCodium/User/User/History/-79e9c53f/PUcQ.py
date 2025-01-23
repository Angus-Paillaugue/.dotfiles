# ffmpeg -i input.mp4 -vcodec libx265 -crf 28 -preset ultrafast output.mp4

import ffmpeg
input_file = 'compress.mp4'
output_file = 'compress_out.mp4'

(
  ffmpeg
  .input(input_file)
  .output(output_file, vcodec='libx265', crf=28, preset='ultrafast')
  .global_args('-report')
  .run()
)
