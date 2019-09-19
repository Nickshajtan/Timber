<?php 
/*
 * Is a template for 404 error page
 */
require_once __DIR__ . '/template_part/er_functions.php';
include_once __DIR__ . '/template_part/er_header.php'; 
?>
<section class="page-wrapper" id="content-read">
    <div class="clearfix"></div>
    <div class="container-fluid">
      <div class="error-page-wrapper">
       <div class="col-sm-12">
<?php include_once __DIR__ . '/template_part/er_main_content.php'; ?>       
        </div>
       </div>
    </div>
</section>
<?php
include_once __DIR__ . '/template_part/er_footer.php';       
        