<?php

require_once __DIR__ . "/database/database.php";

function h($value)
{
    return htmlspecialchars((string) $value, ENT_QUOTES, "UTF-8");
}

$sql = "SELECT r.id, COALESCE(NULLIF(CONCAT_WS(' ', p.first_name, p.last_name), ''), r.display_name) AS display_name, r.updated_at " .
    "FROM pds_records r LEFT JOIN personal_information p ON p.pds_id = r.id " .
    "ORDER BY r.updated_at DESC, r.id DESC";
$records = $conn->query($sql);
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="bootstrap/bootstrap.min.css">
  <link rel="stylesheet" href="style.css">
  <title>Saved PDS Records</title>
</head>
<body>
  <main class="container form-container">
    <h1>Saved PDS Records</h1>
    <p><a class="btn btn-primary" href="personal.html">CREATE NEW PDS</a></p>
    <div class="table-responsive">
      <table class="table table-striped align-middle">
        <thead><tr><th>Name</th><th>Last updated</th><th>Actions</th></tr></thead>
        <tbody>
          <?php while ($record = $records->fetch_assoc()): ?>
            <tr>
              <th scope="row"><?= h($record["display_name"]) ?></th>
              <td><?= h($record["updated_at"]) ?></td>
              <td>
                <a class="btn btn-sm btn-outline-primary" href="view_one.php?id=<?= (int) $record["id"] ?>">VIEW</a>
                <a class="btn btn-sm btn-outline-secondary" href="edit_pds.php?id=<?= (int) $record["id"] ?>">EDIT</a>
                <form method="post" action="delete_pds.php" class="d-inline" onsubmit="return confirm('Delete this PDS record?');">
                  <input type="hidden" name="id" value="<?= (int) $record["id"] ?>">
                  <button class="btn btn-sm btn-outline-danger" type="submit">DELETE</button>
                </form>
              </td>
            </tr>
          <?php endwhile; ?>
        </tbody>
      </table>
      <?php if ($records->num_rows === 0): ?>
        <p>No PDS records have been saved yet.</p>
      <?php endif; ?>
    </div>
  </main>
</body>
</html>
