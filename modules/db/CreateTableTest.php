<?php
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

    $sql = "CREATE TABLE discord_messages
            (
                PID bigint(20) unsigned not null auto_increment,

                ChannelType CHAR(255) COMMENT '채널 타입',
                ChannelId CHAR(255) COMMENT '채널 아이디',
                ChannelName CHAR(255) COMMENT '채널 이름',
                
                GuildId CHAR(255) COMMENT '길드 아이디',
                GuildName CHAR(255) COMMENT '길드 이름',

                Message LONGTEXT COMMENT '메세지 내용',

                AuthorId CHAR(255) COMMENT '작성자 아이디',
                AuthorUsername CHAR(255) COMMENT '작성자 유저이름',
                AuthorBot tinyint(1) DEFAULT '1' COMMENT '봇 여부',

                Embed tinyint(1) DEFAULT '1' COMMENT '봇 여부',

                CreateTime CHAR(255) COMMENT '메세지 보낸 시간',

                PRIMARY KEY(PID)
            ) charset=utf8";

    if (mysqli_query($conn,$sql)){
        echo "성공적으로 테이블을 만들었습니다.<br/>";
    } else {
        echo "테이블 생성 오류 : " . mysqli_error($conn);
        exit;
    }
?>
