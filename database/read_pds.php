<?php

require_once __DIR__ . "/pds_crud.php";

$id = pdsValidId(isset($_GET["id"]) ? $_GET["id"] : null);
if (!$id) {
    pdsJsonResponse(400, array("error" => "A valid PDS record ID is required."));
}

try {
    $record = pdsReadRecord($id);
    if ($record === null) {
        pdsJsonResponse(404, array("error" => "PDS record not found."));
    }
    pdsJsonResponse(200, $record);
} catch (Throwable $error) {
    error_log($error->getMessage());
    pdsJsonResponse(500, array("error" => "Could not read the PDS record. Check the database setup."));
}
