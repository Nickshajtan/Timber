<?php 
/*
 * Is a simple template for Joomla 3.6
 *
 */
define('HACK', TRUE); 
//301 redirect
if($_SERVER['REQUEST_URI'] == '/index.php') 
{
    header("Location: /",TRUE,301);
    exit();
}
require_once __DIR__ . '/template_part/functions.php';
require_once __DIR__ . '/template_part/template-settings.php';
include_once __DIR__ . '/template_part/header.php'; 
?>
<section class="page-wrapper" id="content-read">
    <div class="clearfix"></div>
    <div class="container-fluid">
       <div class="col-sm-12">
        <?php if($this->countModules('fullwidth-1')) : ?>
            <div class="col-sm-12">
                <jdoc:include type="modules" name="fullwidth-1"/>
            </div>            
        <?php endif; ?>
        </div>
        <div class="row-fluid">
         <!--Left column-->
<?php include_once __DIR__ . '/template_part/left_sidebar.php'; ?>
        <!--Center column-->
<?php include_once __DIR__ . '/template_part/main_content.php'; ?>
        <!--Right column-->
<?php include_once __DIR__ . '/template_part/right_sidebar.php'; ?>
        </div>
        <div class="col-sm-12">
        <?php if($this->countModules('fullwidth-2')) : ?>
            <div class="col-sm-12">
                <jdoc:include type="modules" name="fullwidth-2"/>
            </div>            
        <?php endif; ?>
        </div>
    </div>
</section>    
<?php
include_once __DIR__ . '/template_part/footer.php';
  
