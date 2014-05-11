<?php
	class Type extends Model {
		public function __construct() {
			parent::__construct();
		}

		/**
		* getParentID function
		* 返回父节点ID
		* @param name string 父节点名
		* @author hhq
		*/
		public function getParentID($name) {
			$row = $this->fetch(array("name" => $name));

			return $row[0]['id'];
		}
	}