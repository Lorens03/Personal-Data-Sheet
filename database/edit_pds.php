<?php

require_once __DIR__ . "/pds_crud.php";

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

header("Location: ../personal.html?id=" . $id);
exit;
