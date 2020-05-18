<?php
    error_reporting(E_ALL);
    ini_set("display_errors", 1);

    $array = array("firstName" => "", "name" => "", "mail" => "", "subject" => "", "message" => "", "success" => "", "error" => "", "isSuccess" => false);
    $emailTo = 'sylvain.naudy@gmail.com';

    if($_SERVER["REQUEST_METHOD"] === "POST") {
        $array["firstName"] = inputVerify($_POST["prenom"]);
        $array["name"] = inputVerify($_POST["nom"]);
        $array["mail"] = inputVerify($_POST["mail"]);
        $array["subject"] = inputVerify($_POST["sujet"]);
        $array["message"] = inputVerify($_POST["message"]);
        $array["isSuccess"] = true;
        $emailText = "";

        if(empty($array["firstName"]) || empty($array["name"]) || empty($array["mail"]) || empty($array["subject"]) || empty($array["message"])) {
            $array["error"] = 'Veuillez remplir tout les champs !';
            $array["isSuccess"] = false;
        }elseif(!isEmail($array["mail"])) {
            $array["error"] = 'Email non valide !';
            $array["isSuccess"] = false;
        }else {
            $array["success"] = 'Le message à bien été envoyé. Merci de m\'avoir contacté !';
            $emailText = 'Nom: ' . $array["name"] . ' Prénom: ' . $array["firstName"] . '\n ' . 'Email : ' . $array["mail"] . '\n ' . 'Sujet : ' . $array["subject"] . '\n ' . 'Message : ' . $array["message"] . '\n ';
        }

        if($array["isSuccess"]) {
            //Envoie email
            $headers = 'From: ' . $array["firstName"] . ' ' . $array["name"] . '<' . $array["mail"] . '>\r\nReply-To: ' . $array["mail"];
            mail($emailTo, 'Message du Portfolio', $emailText, $headers);
        }

        echo json_encode($array);

    }

    function isEmail($var) {
        return filter_var($var, FILTER_VALIDATE_EMAIL);
    }

    function inputVerify($var) {
        $var = trim($var);
        $var = stripslashes($var);
        $var = htmlspecialchars($var);
        return $var;
    }
?>