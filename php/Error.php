<?php

class Error
{
    public static function respond($text)
    {
        header('HTTP/1.1 500 Internal server error');

        die($text);
    }
}