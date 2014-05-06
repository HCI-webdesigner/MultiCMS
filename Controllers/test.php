<?php
	class Test extends Controller {
		var $jsonStr;

		var $typeArr;

		public function uuid() {
				
		}

		public function index() {
			$jsonStr = '[[{"name":"root","children":[{"name":"web","children":[{"name":"aa","children":[]}]},{"name":"apps","children":[]}]}],[{"name":"next","children":[{"name":"bb","children":[]}]}]]';
			$jsonArr = json_decode($jsonStr, true);

			foreach ($jsonArr as $typeArr) {
				$this->typeOP($typeArr, "");
			}
		}

		public function haveChildren($arr) {
			if(is_array($arr['children']) && count($arr['children']) == 0) {
				return false;
			}else {
				return true;
			}
		}

		public function typeOP($typeArr, $parent) {
			foreach ($typeArr as $val) {
				$this->store($parent, $val['name']);
				if($this->haveChildren($val)) {
					$se_parent = $val['name'];
					$this->typeOP($val['children'], $se_parent);
				}
			}
		}

		public function store($parent, $name) {
			$db = new Database('127.0.0.1', '', 'root', 'root', 'hhq', true);
			$database = $db->getInstance();
			$createSQL = "CREATE TABLE IF NOT EXISTS `type` (
							id int(10) NOT NULL AUTO_INCREMENT,
							name varchar(20) NOT NULL,
							parent varchar(10) NOT NULL,
							PRIMARY KEY (id)
							)";

			$database->exec($createSQL);
			
			$insertSQL = "INSERT INTO `type`
							(id, name, parent)
							VALUES ('', '{$name}', '{$parent}')";

			var_dump($database->exec($insertSQL));
		}
	}
/**/