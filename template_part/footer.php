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
                <?php if($this->countModules('footer-column-1')) : ?>
            <?php    
               if(($this->countModules('footer-column-2 and footer-column-3 and footer-column-4') != 0)) 
                { $countfooter='3'; }
                
                elseif((($this->countModules('footer-column-2') == 0)&&($this->countModules('footer-column-3') == 0)) || (($this->countModules('footer-column-2') == 0)&&($this->countModules('footer-column-4') == 0)) || (($this->countModules('footer-column-3') == 0)&&($this->countModules('footer-column-4') == 0)))
                { $countfooter='6'; }
                
                
                 elseif(($this->countModules('footer-column-2 || footer-column-3 || footer-column-4') == 0))
                {$countfooter='4'; }   
                
                
                else{ $countfooter='12'; }       
                ?>
                    <div class="footer-column col-sm-<?php echo $countfooter; ?>">
                        <jdoc:include type="modules" name="footer-column-1"/>
                    </div>            
                <?php endif; ?>
                <?php if($this->countModules('footer-column-2')) : ?>
            <?php    
               if(($this->countModules('footer-column-1 and footer-column-3 and footer-column-4') != 0)) 
                { $countfooter='3'; }
                
                elseif((($this->countModules('footer-column-1') == 0)&&($this->countModules('footer-column-3') == 0)) || (($this->countModules('footer-column-1') == 0)&&($this->countModules('footer-column-4') == 0)) || (($this->countModules('footer-column-3') == 0)&&($this->countModules('footer-column-4') == 0)))
                { $countfooter='6'; }
                
                
                 elseif(($this->countModules('footer-column-1 || footer-column-3 || footer-column-4') == 0))
                {$countfooter='4'; }   
                
                
                else{ $countfooter='12'; }       
                ?>
                    <div class="footer-column col-sm-<?php echo $countfooter; ?>">
                        <jdoc:include type="modules" name="footer-column-2"/>
                    </div>            
                <?php endif; ?>
                <?php if($this->countModules('footer-column-3')) : ?>
                    <?php    
               if(($this->countModules('footer-column-2 and footer-column-1 and footer-column-4') != 0)) 
                { $countfooter='3'; }
                
                elseif((($this->countModules('footer-column-2') == 0)&&($this->countModules('footer-column-1') == 0)) || (($this->countModules('footer-column-2') == 0)&&($this->countModules('footer-column-4') == 0)) || (($this->countModules('footer-column-1') == 0)&&($this->countModules('footer-column-4') == 0)))
                { $countfooter='6'; }
                
                
                 elseif(($this->countModules('footer-column-2 || footer-column-1 || footer-column-4') == 0))
                {$countfooter='4'; }   
                
                
                else{ $countfooter='12'; }       
                ?>
                       
                    <div class="footer-column col-sm-<?php echo $countfooter; ?>">
                        <jdoc:include type="modules" name="footer-column-3"/>
                    </div>            
                <?php endif; ?>
                <?php if($this->countModules('footer-column-4')) : ?>
                <?php    
               if(($this->countModules('footer-column-2 and footer-column-3 and footer-column-1') != 0)) 
                { $countfooter='3'; }
                
                elseif((($this->countModules('footer-column-2') == 0)&&($this->countModules('footer-column-3') == 0)) || (($this->countModules('footer-column-2') == 0)&&($this->countModules('footer-column-1') == 0)) || (($this->countModules('footer-column-3') == 0)&&($this->countModules('footer-column-1') == 0)))
                { $countfooter='6'; }
                
                
                 elseif(($this->countModules('footer-column-2 || footer-column-3 || footer-column-1') == 0))
                {$countfooter='4'; }   
                
                
                else{ $countfooter='12'; }       
                ?>   
                    <div class="footer-column col-sm-<?php echo $countfooter; ?>">
                        <jdoc:include type="modules" name="footer-column-4"/>
                    </div>            
                <?php endif; ?>
            </div>
            <div class="row">
                <?php if($this->countModules('prefooter')) : ?>
                    <div class="col-sm-12 prefooter">
                        <jdoc:include type="modules" name="prefooter"/>
                    </div>            
                <?php endif; ?>
                <div class="col-sm-12">
                   <div class="col-sm-4"></div>
                   <div class="col-sm-4 social">
                    <script type="text/javascript">(function(w,doc) {
if (!w.__utlWdgt ) {
    w.__utlWdgt = true;
    var d = doc, s = d.createElement('script'), g = 'getElementsByTagName';
    s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
    s.src = ('https:' == w.location.protocol ? 'https' : 'http')  + '://w.uptolike.com/widgets/v1/uptolike.js';
    var h=d[g]('body')[0];
    h.appendChild(s);
}})(window,document);
</script>
<div data-mobile-view="true" data-share-size="30" data-like-text-enable="false" data-background-alpha="0.0" data-pid="1750664" data-mode="share" data-background-color="#ffffff" data-hover-effect="rotate-cw" data-share-shape="round" data-share-counter-size="12" data-icon-color="#ffffff" data-mobile-sn-ids="fb.vk.tw.ok.wh.vb.tm." data-text-color="#000000" data-buttons-color="#ffffff" data-counter-background-color="#ffffff" data-share-counter-type="disable" data-orientation="horizontal" data-following-enable="false" data-sn-ids="fb.tw.tm.gp.em." data-preview-mobile="false" data-selection-enable="true" data-exclude-show-more="false" data-share-style="6" data-counter-background-alpha="1.0" data-top-button="true" class="uptolike-buttons" ></div>
                </div>
                <div class="col-sm-4"></div>
                </div>
                <?php if($this->countModules('footer')) : ?>
                    <div class="col-sm-12 footer">
                        <jdoc:include type="modules" name="footer"/>  
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
        </div>
    </body>
</html>