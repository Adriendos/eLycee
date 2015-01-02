<?php

class CommentPost extends \Eloquent {
	protected $table = 'comment_post';
	protected $guardable = ['id'];
}