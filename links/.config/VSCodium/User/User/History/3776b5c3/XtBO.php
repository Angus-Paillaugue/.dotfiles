<?php

function add(...$arr): int
{
  // If the first element is an array, we assume it was called with a single array argument.
  if (count($arr) === 1 && is_array($arr[0])) {
    $arr = $arr[0];
  }
  return array_sum($arr);
} ?>


<p><?php echo add(1, 2, 3, 7); ?></p>
<p><?php echo add([1, 2, 3, 7]); ?></p>
