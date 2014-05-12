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
			$params = array($name);
			$row = $this->fetch('where name=?', $params);

			return $row[0]['id'];
		}

		/**
		* @author hhq
		*/
		public function getTypes() {
			$rows = $this->fetch();

			return $rows;
		}
	}