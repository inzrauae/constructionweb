<?php
    // Only process POST requests.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        // Honeypot spam trap — real visitors never fill this hidden field.
        $honeypot = trim($_POST["rev_website"] ?? "");
        if (!empty($honeypot)) {
            http_response_code(200);
            echo "Thank you! Your review has been submitted.";
            exit;
        }

        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["rev_name"] ?? ""));
        $name = str_replace(array("\r", "\n"), array(" ", " "), $name);
        $email = filter_var(trim($_POST["rev_email"] ?? ""), FILTER_SANITIZE_EMAIL);
        $rating = trim($_POST["rev_rating"] ?? "");
        $message = trim($_POST["rev_message"] ?? "");

        // Check that data was sent to the mailer.
        if (
            empty($name) ||
            empty($message) ||
            !filter_var($email, FILTER_VALIDATE_EMAIL) ||
            !in_array($rating, array("1", "2", "3", "4", "5"), true)
        ) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        $recipient = "info@gauraconstruction.lk";
        $subject = "New Website Review from $name ($rating/5)";

        // Email content.
        $email_content = "A new review was submitted on the website review form.\n\n";
        $email_content .= "Name: $name\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Rating: $rating / 5\n\n";
        $email_content .= "Review:\n$message\n\n";
        $email_content .= "This review has not been published — add it to reviews.html manually after checking it.\n";

        // Email headers. Send "From" the site domain and reply to the visitor's email.
        $email_headers = "From: Gaura Construction Website <no-reply@gauraconstruction.lk>\r\n";
        $email_headers .= "Reply-To: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Thank you! Your review has been submitted and will be reviewed by our team.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your review.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "There was a problem with your submission, please try again.";
    }

?>
