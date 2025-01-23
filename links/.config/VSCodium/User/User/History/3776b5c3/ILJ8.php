<?php

  function sayFuckYou() : void {
    echo 'fuck you!';
  }

  function add(...$arr : [$int]) : int {
    $count = 0;

    foreach($arr as $el) {
      $count += $el;
    }

    return $count;
  }

?>


<h1><?php sayFuckYou(); ?></h1>
