<?php
    header("Access-Control-Allow-Origin: *");
    
    // https://have-fun.tistory.com/entry/DB데이터-삽입-수정-삭제
    $db_host = "localhost";
    $db_user = "DB아이디";
    $db_passwd = "DB암호";
    $db_name = "DB명";
  
    // MySQL - DB 접속.
    $conn = mysqli_connect($db_host,$db_user,$db_passwd,$db_name);
    if (mysqli_connect_errno()){
        echo "MySQL 연결 오류: " . mysqli_connect_error();
        exit;
    } else {
        echo "DB : \"$db_name\"에 접속 성공.<br/>";
    }

    // 문자셋 설정, utf8.
    mysqli_set_charset($conn,"utf8");

    // post 데이터 변형
    $_POST = json_decode(file_get_contents("php://input"), true);
    // $channelName22 = $_POST[channelName];
    // echo "$channelName22 야옹?";

    if(isset($_POST[channelType]) &&
        isset($_POST[channelId]) &&
        isset($_POST[channelName]) &&
        isset($_POST[guildId]) &&
        isset($_POST[guildName]) &&
        isset($_POST[message]) &&
        isset($_POST[authorId]) &&
        isset($_POST[authorUsername]) &&
        isset($_POST[authorBot]) &&
        isset($_POST[embed]) &&
        isset($_POST[createTime])
    ) {
        $channelType = $_POST[channelType];
        $channelId = $_POST[channelId];
        $channelName = $_POST[channelName];
        $guildId = $_POST[guildId];
        $guildName = $_POST[guildName];
        $message = $_POST[message];
        $authorId = $_POST[authorId];
        $authorUsername = $_POST[authorUsername];
        $authorBot = $_POST[authorBot];
        $embed = $_POST[embed];
        $createTime = $_POST[createTime];
    
        // 테이블에 값 쓰기.
        $sql = "INSERT INTO discord_messages (PID, ChannelType, ChannelId, ChannelName, GuildId, GuildName, Message, AuthorId, AuthorUsername, AuthorBot, Embed, CreateTime)
        VALUES (NULL, '$channelType', '$channelId', '$channelName', '$guildId', '$guildName', '$message', '$authorId', '$authorUsername', '$authorBot', '$embed', '$createTime')";
    
        if (mysqli_query($conn,$sql)){
            echo "테이블에 값 쓰기 완료: $sql<br/>";
        } else {
            echo "테이블에 값 쓰기 오류: " . mysqli_error($conn);
        }
        
    } else {
        echo "입력 된 데이터가 부족합니다. ";
        exit;
    }

    mysqli_close($conn);
?>