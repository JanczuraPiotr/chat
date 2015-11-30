<?php
namespace server\service;

class DB extends \PDO{
  private $dbtype;
  private $dbhost;
  private $dbname;
  private $dbport;
  private $dbuser;
  private $dbpass;

  public function __construct($dbtype, $dbhost, $dbname, $dbport, $dbuser, $dbpass, $charset = 'utf8'){
    parent::__construct($dbtype.':host='.$dbhost.';dbname='.$dbname.';port='.$dbport, $dbuser, $dbpass);
    $this->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
    $this->query("set names $charset");
    $this->transaction=0;
    $this->rollback=false;
    $this->dbtype = $dbtype;
    $this->dbhost = $dbhost;
    $this->dbname = $dbname;
    $this->dbport = $dbport;
    $this->dbuser = $dbuser;
    $this->dbpass = $dbpass;
  }

}
