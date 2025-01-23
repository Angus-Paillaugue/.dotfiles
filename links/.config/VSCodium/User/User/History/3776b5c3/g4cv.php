<?php

function add(...$arr): int
{
  return array_sum($arr);
}
?>


<p><?php echo add(1, 2, 3, 7); ?></p>
<p><?php echo add(array(1, 2, 3, 7)); ?></p>
