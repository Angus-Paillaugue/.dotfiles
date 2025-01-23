<?php

function add(...$arr): int
{
  if (count($arr) === 1 && is_array($arr[0])) {
    $arr = $arr[0];
  }
  return array_sum($arr);
}
?>


<p><?php echo add(1, 2, 3, 7); ?></p>
<p><?php echo add(array(1, 2, 3, 7)); ?></p>
