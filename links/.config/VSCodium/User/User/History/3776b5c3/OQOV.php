<?php

  function sayFuckYou() : void {
    echo 'fuck you!';
  }

function add(...$arr) : int {
  return array_sum($arr);
}

?>


<h1><?php sayFuckYou(); ?></h1>

<p><?php echo add(1, 2, 3, 7); ?></p>
