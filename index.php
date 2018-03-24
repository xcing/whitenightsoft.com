<?php
include 'wording.php';
session_start();

$lang = isset($_GET['lang']) ? $_GET['lang'] : "";
if ($lang != null) {
    $_SESSION['lang'] = $lang;
} else if ($_SESSION['lang'] == null) {
    $_SESSION['lang'] = 'th';
}

$banner_array[0] = array(
    'banner' => 'images/banner_game_Chess_Thai.jpg',
    'tablet_banner' => 'images/banner_game_Chess_Thai_mobile.jpg',
    'mobile_banner' => 'images/banner_game_Chess_Thai_mobile.jpg',
    'link' => '#',
);
/* $banner_array[1] = array(
  'banner' => 'images/VTEC_microsite_1800x480_B.png',
  'tablet_banner' => 'images/VTEC_microsite_1800x480_B_mobile.png',
  'mobile_banner' => 'images/VTEC_microsite_1800x480_B_mobile.png',
  'link' => '#',
  ); */
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="en" />

        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
        <link href="css/bootstrap.css" media="screen" rel="stylesheet" type="text/css" />
        <link href="css/custom_bootstrap.css" media="screen" rel="stylesheet" type="text/css" />
        <link href="css/global.css?v=6" media="screen" rel="stylesheet" type="text/css" />
        <link href="sidr-mobilemenu/jquery.sidr.light.css" media="screen" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="js/jquery-1.10.1.min.js"></script>

        <script type="text/javascript" src="sidr-mobilemenu/jquery.sidr.min.js"></script>
        <link href="css/bxslider/jquery.bxslider.css" media="screen" rel="stylesheet" type="text/css" />
        <script type="text/javascript" src="js/bxslider/jquery.bxslider.min.js"></script>

        <title>White Night Soft</title>
    </head>
    <body id='body'>
        <div style="position:relative;">
            <div style="position:absolute;right:0px;">
                <a id="right-menu" href="#sidr-left"><img src="images/ico_menu.png" /></a>
            </div>

            <div id="sidr-right">
                <ul>
                    <li class="active">
                        <a href="#" style="font-size:22pt;"><?php echo $wording[$_SESSION['lang']]['menu_index']; ?></a>
                    </li>
                    <li>
                        <a href="aboutus.php" style="font-size:22pt;"><?php echo $wording[$_SESSION['lang']]['menu_aboutus']; ?></a>
                    </li>
                    <li>
                        <a href="index.php?lang=th" style="font-size:22pt;">
                            <img src="images/ico_language_th.png" /> <?php echo $wording[$_SESSION['lang']]['menu_lang_th']; ?>
                        </a>
                    </li>
                    <li>
                        <a href="index.php?lang=en" style="font-size:22pt;">
                            <img src="images/ico_language_en.png" /> <?php echo $wording[$_SESSION['lang']]['menu_lang_en']; ?>
                        </a>
                    </li>
                </ul>
            </div>

            <script type="text/javascript">
                $(document).ready(function () {
                    //$('.bxslider').bxSlider();

                    $('#simple-menu').sidr();
                    $('#left-menu').sidr({
                        name: 'sidr-left',
                        side: 'left' // By default
                    });
                    $('#right-menu').sidr({
                        name: 'sidr-right',
                        side: 'right'
                    });
                });
            </script>
            <div style="background-color: #1f1f1f;padding-bottom:100px;">
                <!--ul class="bxslider"-->
                <?php foreach ($banner_array as $banner) { ?>
                    <!--li-->
                    <?php if ($banner['link'] != '#') { ?>
                        <a href="<?= $banner['link']; ?>" target="_blank">
                        <?php } ?>
                        <img src="<?= $banner['banner']; ?>" class="img-responsive hidden-xs" style="width: 100%;" />
                        <img src="<?= $banner['mobile_banner']; ?>" class="img-responsive visible-xs" style="width: 100%;" />
                        <?php if ($banner['link'] != '') { ?>
                        </a>
                    <?php } ?>
                    <!--/li-->
                <?php } ?>
                <!--/ul-->

                <div style="max-width:1000px;margin:0px auto;padding:30px 0px;">
                    <div style="text-align: center;font-size:60pt;color:#ffa500;margin-bottom: 10px;font-family: pgvim;"><?php echo $wording[$_SESSION['lang']]['index_header']; ?></div>
                    <div class="col-lg-3 col-md-3 col-sm-6" style='margin-bottom:10px;text-align: center;'></div>
                    <div class="col-lg-3 col-md-3 col-sm-6" style='margin-bottom:10px;text-align: center;'>
                        <a href="makruk.php">
                            <img src="images/app_ico_Chess_Thai.png" style="margin-bottom: 5px;"/>
                            <br />
                            <span style="color:#d9d9d9;font-size:15pt;"><?php echo $wording[$_SESSION['lang']]['index_makruk1']; ?> <br /><?php echo $wording[$_SESSION['lang']]['index_makruk2']; ?></span>
                        </a>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-6" style='margin-bottom:10px;text-align: center;'>
                        <a href="#">
                            <img src="images/app_ico_Chess_International.png" style="margin-bottom: 5px;"/>
                            <br />
                            <span style="color:#d9d9d9;font-size:15pt;"><?php echo $wording[$_SESSION['lang']]['index_chess1']; ?> <br /><?php echo $wording[$_SESSION['lang']]['index_chess2']; ?></span>
                        </a>
                    </div>
                    <div class="col-lg-3 col-md-3 col-sm-6" style='margin-bottom:10px;text-align: center;'></div>
                    <div style="clear:both;margin-bottom:0px;"></div>
                </div>
            </div>
            <div style="background-color: #FFFFFF;width:100%;position:fixed;bottom:0;">
                <div style="float:left;"><img src="images/logo_moby_software.png" class='img-responsive'/></div>
                <div style="float:left;"><img src="images/logo_MOL.png" class='img-responsive'/></div>
                <div style="float: right;position: relative;left: -50%;text-align: left;">
                    <a href="https://www.facebook.com/makrukonline/" target="_blank">
                        <img src="images/ico_buttom_nav_facebook.png" class='img-responsive'/>
                    </a>
                </div>
                <div style="float:right;color:#4d4d4d;font-size:10pt;text-align:right;margin-top:15px;">Copyright © 2016 by WHITE NIGHT SOFT Developers Team<br />
                    M: +66 (0) 891453832<br />
                    E: contact@whitenightsoft.com
                </div>
                <div style="clear:both;"></div>
            </div>
        </div>
    </body>
</html>

<script>
    window.setInterval(function () {
        $("#body").css("background-color", "#1f1f1f");
    }, 1000);
</script>