# ffmpeg -vcodec libx265 -crf 24 -preset ultrafast -c:v h264_cuvid -i 0gmx1qeva6d04dhwavppe.mp4 0gmx1qeva6d04dhwavppe_test.mp4

import ffmpeg
import ffmpeg
input_file = 'compress.mp4'
output_file = 'compress_out.mp4'

ffmpeg.input(input_file).output(output_file, vcodec='libx265', crf=28, preset='ultrafast').run()
