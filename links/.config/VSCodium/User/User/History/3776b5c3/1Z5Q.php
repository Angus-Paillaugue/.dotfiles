<?php

function add(...$arr): int
{
  return $arr instanceof array ? array_sum($arr);
}
?>


<p><?php echo add(1, 2, 3, 7); ?></p>
