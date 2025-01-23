<script>
  import { io } from 'socket.io-client';

  const socket = io()

  socket.on('metrics', (message) => {
    console.log(message)
  })
</script>
