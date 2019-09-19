<?php
/*
 * Footer part of any page
 *
 */
?>                   
             <!-- Footer part of theme -->  
 <section class="footer-wrapper">
    <footer itemscope itemtype="http://schema.org/Footer">              
        <div class="clearfix"></div>       
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                   <div class="col-sm-4"></div>
                   <div class="col-sm-4 social">
                    </div>
                    <div class="col-sm-4"></div>
                    </div>
                <?php if (JModuleHelper::getModule('footer')) : ?>    
                    <div class="col-sm-12 footer">
                          <?php echo $doc->getBuffer('modules', 'footer', array('style' => 'none')); ?>
                    </div>            
                <?php endif; ?>
                <div class="col-sm-12 copyright">
                    <p  class="copyright">
                    <?php echo $sitename. ' &copy; '.  date('Y'); ?> | <a href="mailto:honeycombcompany@gmail.com">by HCC</a></p>
                </div>
            </div>    
        </div>
        <script src="http://atuin.ru/js/art/stars.js" type="text/javascript"></script>
    </footer>
</section>               
                </div>
            </div>
        </div>
    </body>
</html>