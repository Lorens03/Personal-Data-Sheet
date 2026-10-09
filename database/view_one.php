<?php

require_once __DIR__ . "/pds_crud.php";

function h($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES, "UTF-8");
}

$id = pdsValidId(isset($_GET["id"]) ? $_GET["id"] : null);
if (!$id) {
    http_response_code(400);
    exit("A valid PDS record ID is required.");
}

$record = pdsReadRecord($id);
if ($record === null) {
    http_response_code(404);
    exit("PDS record not found.");
}

$sectionTitles = array(
    "personal" => "Personal Information",
    "family" => "Family Background",
    "education" => "Educational Background"
);
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="bootstrap/bootstrap.min.css">
  <link rel="stylesheet" href="style.css">
  <title>View PDS Record</title>
</head>
<body>
  <main class="container form-container">
    <h1>Personal Data Sheet</h1>
    <?php foreach ($sectionTitles as $section => $title): ?>
      <h2 class="remark"><?= h($title) ?></h2>
      <dl class="row">
        <?php foreach ($record["data"][$section] as $field => $value): ?>
          <?php if ($field === "children" || $value === null || $value === "") { continue; } ?>
          <dt class="col-sm-5"><?= h(ucwords(preg_replace('/([a-z])([A-Z])/', '$1 $2', $field))) ?></dt>
          <dd class="col-sm-7"><?= h(is_bool($value) ? ($value ? "Yes" : "No") : $value) ?></dd>
        <?php endforeach; ?>
      </dl>
    <?php endforeach; ?>

    <h2 class="remark">Children</h2>
    <?php if (count($record["data"]["family"]["children"]) === 0): ?>
      <p>No children listed.</p>
    <?php else: ?>
      <ul>
        <?php foreach ($record["data"]["family"]["children"] as $child): ?>
          <li><?= h($child["fullName"]) ?><?= $child["dateOfBirth"] ? " — " . h($child["dateOfBirth"]) : "" ?></li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>

    <a class="btn btn-secondary" href="view_pds.php">BACK TO RECORDS</a>
    <a class="btn btn-primary" href="edit_pds.php?id=<?= (int) $id ?>">EDIT</a>
  </main>
</body>
</html>
