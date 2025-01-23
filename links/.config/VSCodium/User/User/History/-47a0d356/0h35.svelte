<script>
  import { io } from 'socket.io-client';

  const socket = io()

  socket.on('eventFromServer', (message) => {
    console.log(message)
  })
</script>
