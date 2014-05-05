<?php
	class Test extends Controller {
		var $jsonStr;

		var $typeArr;

		public function index() {
			// $typeArr = array(array("name" => "Web",
			// 						"children" => array(array(
			// 												"name" => "play",
			// 												"children" => ""),
			// 											array("name" => "php",
			// 											"children" => ""))));
			// $jsonStr = json_encode($typeArr);
			$jsonStr = '[{"name":"Web","children":[{"name":"play","children":""},{"name":"php","children":""}]}]';
			$typeArr = json_decode($jsonStr, true);
			// print_r($typeArr);
			// die($jsonStr);
			$this->typeOP($typeArr);
		}

		public function haveChildren($arr) {
			if(isset($arr['children']) && $arr['children'] == "") {
				return false;
			}else {
				return true;
			}
		}

		public function typeOP($typeArr) {
			// echo "<pre>";
			// print_r($typeArr);
			// echo "</pre>";
			foreach ($typeArr as $val) {
				if($this->haveChildren($val)) {
					$this->typeOP($val['children']);
				}
				$this->store($val, $val['children']);
			}
		}

		public function store($val, $children) {
			$db = new Database('127.0.0.1', '', 'root', 'root', 'hhq', true);
			$database = $db->getInstance();
			$createSQL = "CREATE TABLE IF NOT EXISTS `type` (
							id int(10) NOT NULL AUTO_INCREMENT,
							name varchar(20) NOT NULL,
							children varchar(10) NOT NULL,
							PRIMARY KEY (id)
							)";

			$database->exec($createSQL);

			if(is_array($children)) {
				$name = $this->getNames($children);

				$insertSQL = "INSERT INTO `type`
								(id, name, children)
								VALUES ('', '{$val['name']}', '{$name}')";
			}else {
				$insertSQL = "INSERT INTO `type`
								(id, name, children)
								VALUES ('', '{$val['name']}', '')";
			}
			
			var_dump($database->exec($insertSQL));
		}

		protected function getNames($children) {
			$name = "";
			foreach ($children as $val) {
				if(isset($val['name'])) {
					$name = $name . $val['name'] . ',';
				}
			}

			return trim($name, ',');
		}
	}
/**/