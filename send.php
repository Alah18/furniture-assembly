<?php
$to = "xxlexx@list.ru"; 
$subject = "Новая заявка на сборку мебели с сайта mebelsoberem.ru";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name  = isset($_POST['Имя']) ? strip_tags(trim($_POST['Имя'])) : '';
    $phone = isset($_POST['Телефон']) ? strip_tags(trim($_POST['Телефон'])) : '';
    $what  = isset($_POST['Что собрать']) ? strip_tags(trim($_POST['Что собрать'])) : '';
    $sum   = isset($_POST['Стоимость мебели']) ? strip_tags(trim($_POST['Стоимость мебели'])) : 'Не указана';


    $message = "Поступила новая заявка с сайта:\n\n";
    $message .= "Имя: " . $name . "\n";
    $message .= "Телефон: " . $phone . "\n";
    $message .= "Что нужно собрать: " . $what . "\n";
    $message .= "Стоимость мебели: " . $sum . "\n";

   
    $boundary = md5(time());


    $headers = "From: noreply@mebelsoberem.ru\r\n";
    $headers .= "Reply-To: noreply@mebelsoberem.ru\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";


    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
    $body .= $message . "\r\n";


    if (isset($_FILES['attachment']) && $_FILES['attachment']['error'] == UPLOAD_ERR_OK) {
        $fileTmpPath   = $_FILES['attachment']['tmp_name'];
        $fileName      = $_FILES['attachment']['name'];
        $fileSize      = $_FILES['attachment']['size'];
        $fileType      = $_FILES['attachment']['type'];
        
   
        if ($fileSize < 10 * 1024 * 1024) {
            $fileContent = chunk_split(base64_encode(file_get_contents($fileTmpPath)));
            
            $body .= "--{$boundary}\r\n";
            $body .= "Content-Type: {$fileType}; name=\"{$fileName}\"\r\n";
            $body .= "Content-Transfer-Encoding: base64\r\n";
            $body .= "Content-Disposition: attachment; filename=\"{$fileName}\"\r\n\r\n";
            $body .= $fileContent . "\r\n";
        }
    }

    $body .= "--{$boundary}--";


    if (mail($to, $subject, $body, $headers)) {
   
        echo "Спасибо! Ваша заявка успешно отправлена.";
    } else {
        http_response_code(500);
        echo "Ошибка при отправке письма на сервере.";
    }
} else {
    http_response_code(403);
    echo "Доступ запрещен.";
}
?>