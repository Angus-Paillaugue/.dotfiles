<?php

function add(...$arr): int
{
  // If the first element is an array, we assume it was called with a single array argument.
  if (count($arr) === 1 && is_array($arr[0])) {
    $arr = $arr[0];
  }
  return array_sum($arr);
}

  require('../lib/connector.php');

  $conn = new sql_connector("TP1", "localhost", "school", "\$iutinfo");

  $data = $conn->run_query("SELECT * FROM test WHERE :num;",
    array(
			array('num','1'),
		)
  );
  var_dump($data);
?>


<p><?php echo add(1, 2, 3, 7); ?></p>
<p><?php echo add([1, 2, 3, 7]); ?></p>
