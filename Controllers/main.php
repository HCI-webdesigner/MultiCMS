<?php
/*
 * 框架默认控制器
 */
class main extends Controller {
    function __construct() {
        //@TODO add something that will be loaded while the controller start to run 
    }

    function index() {
        $vars['indexTitle'] = 'MultiCMS——HCI内部CMS生成系统';
        
        //新版视图加载方法
        $this->render('main', $vars);
    }

    /*
    *refirectPage function
    *@param params array() 保存参数的数组
    *根据参数数组加载页面
    *@author hhq
    */
    public function redirectPage($params) {
    	$this->render($params['pageName']);
    }

    /*
    *copy_dir function
    *@param source string 源文件夹位置
    *@param dest string 目的位置
    *复制文件夹
    *@author hhq
    */
    public function copy_dir($source, $dest) {
        $result = false;

        if(is_file($source)) {
            if($dest[strlen($dest)-1] == '/') {
                $__dest = $dest . "/" . basename($source);
            }else {
                $__dest = $dest;
            }

            $result = @copy($source, $__dest);
            
            @chmod($source, 0755);
        }elseif (is_dir($source)) {
            if($dest[strlen($dest)-1] == '/') {
                $dest = $dest . basename($source);
                @mkdir($dest);
                @chmod($dest, 0777);
            }else {
                @mkdir($dest, 0777);
                @chmod($dest, 0777);
            }
            $dirHandle = opendir($source);
            while($file = readdir($dirHandle)) {
                if($file != "." && $file != "..") {
                    if(!is_dir($source) . "/" . $file) {
                        $__dest = $dest . "/" . $file;
                    }else {
                        $__dest = $dest . "/" . $file;
                    }
                    $result = $this->copy_dir($source . "/" . $file, $__dest);
                }
            }
            closedir($dirHandle);
        }else {
            $result = false;
        }

        return $result;
    }

    /*
	*createProject function
	*创建项目名，将项目名保存在config.php文件中
	*@author hhq
    */
    public function createProject() {
    	//项目名
    	$projectName = $_POST['projectName'];
    	
        if(!is_dir(BASEDIR . '/Output/' . $projectName)) {
        	if(is_dir(BASEDIR . '/Output')) {
        		if(!mkdir(BASEDIR . '/Output/' . $projectName, 0777, true)) {
        			echo "false";
        		}else {
                    $this->copy_dir(BASEDIR . '/CodeIgniter/', BASEDIR . '/Output/');

                    rename(BASEDIR . '/Output/CodeIgniter', BASEDIR . '/Output/' . $projectName);

        			$file = fopen(BASEDIR . '/Output/' . $projectName . '/config.php', "w");
        		
        			chmod(BASEDIR . '/Output/' . $projectName . '/config.php', 0664);
        		
        			$fileContents = "<?php\n\tdefine('PROJECTNAME', '{$projectName}');\n?>";

    				if(fwrite($file, $fileContents) !== FALSE) {
    					echo "true";
    				}else {
    					echo "false";
    				}
        		}
        	}else {
        		echo "false";
        	}
        }else {
            echo "true";
        }
    }

    /*
    *createSort function
    *@param json string json格式的字符串
    *@author hhq
    */
    public function createSort($jsonStr) {

    }

}
