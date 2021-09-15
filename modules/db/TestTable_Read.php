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
    }

    // 문자셋 설정, utf8.
    mysqli_set_charset($conn,"utf8"); 

    // 테이블 쿼리 후 내용 출력.
    $sql = "SELECT * FROM discord_messages";
    if ($result = mysqli_query($conn,$sql)){
        $rows = array();
        while($row = mysqli_fetch_array($result)) {
            $rows[] = $row;
        } 
        $qryResult = array();
        $qryResult['discord_messages'] = $rows;
        echo json_encode($qryResult);

        mysqli_close($conn);

    } else {
        echo "테이블 쿼리 오류: " . mysqli_error($conn);
        exit;
    }
?>