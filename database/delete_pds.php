<?php

require_once __DIR__ . "/pds_crud.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("Allow: POST");
    http_response_code(405);
    exit("Method not allowed.");
}

try {
    $id = isset($_POST["id"]) ? $_POST["id"] : null;
    if (!pdsDeleteRecord($id)) {
        http_response_code(404);
        exit("PDS record not found.");
    }

    header("Location: view_pds.php?deleted=1");
    exit;
} catch (InvalidArgumentException $error) {
    http_response_code(400);
    exit(htmlspecialchars($error->getMessage(), ENT_QUOTES, "UTF-8"));
}
