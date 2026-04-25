<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(403);
    exit;
}

$mobile    = strip_tags(trim($_POST['mobile'] ?? ''));
$email     = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$houseType = strip_tags(trim($_POST['houseType'] ?? ''));
$totalArea = strip_tags(trim($_POST['totalArea'] ?? ''));
$landSqft  = strip_tags(trim($_POST['landSqft'] ?? ''));
$budget    = strip_tags(trim($_POST['budget'] ?? ''));
$standard  = strip_tags(trim($_POST['standard'] ?? ''));
$semiLuxury = strip_tags(trim($_POST['semiLuxury'] ?? ''));
$luxury    = strip_tags(trim($_POST['luxury'] ?? ''));
$premium   = strip_tags(trim($_POST['premium'] ?? ''));

if (empty($mobile) && (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL))) {
    http_response_code(400);
    echo 'Missing contact details.';
    exit;
}

$recipient = 'info@gauraconstruction.lk';
$subject   = 'New Home Estimate Lead - Gaura Construction';

$email_content  = "New Home Estimate Lead\n";
$email_content .= "======================\n\n";
$email_content .= "Mobile : " . ($mobile ?: '-') . "\n";
$email_content .= "Email  : " . ($email  ?: '-') . "\n\n";
$email_content .= "House Type            : $houseType\n";
$email_content .= "Total Build Area (SQFT): $totalArea\n";
$email_content .= "Land Size (SQFT)      : $landSqft\n\n";
$email_content .= "--- Cost Estimates ---\n";
$email_content .= "Budget      : $budget\n";
$email_content .= "Standard    : $standard\n";
$email_content .= "Semi-Luxury : $semiLuxury\n";
$email_content .= "Luxury      : $luxury\n";
$email_content .= "Premium     : $premium\n";

$from = !empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)
    ? $email
    : 'noreply@gauraconstruction.lk';

$email_headers = 'From: Estimate Tool <' . $from . ">\r\n";
$email_headers .= 'Reply-To: ' . $from . "\r\n";
$email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($recipient, $subject, $email_content, $email_headers)) {
    http_response_code(200);
    echo 'OK';
} else {
    http_response_code(500);
    echo 'Mail error';
}
