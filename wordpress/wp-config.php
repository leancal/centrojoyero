<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'metalamarillo_wp_vpsl2' );

/** Database username */
define( 'DB_USER', 'metalamarillo_wp_e7qs9' );

/** Database password */
define( 'DB_PASSWORD', '$oQLFvvJ56*hm3a3' );

/** Database hostname */
define( 'DB_HOST', 'localhost:3306' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', 'Q687F0*@z+N7on/It]UC&U2I6VckXN3CbvX2odon:+puN|#[4Kz)9w:j;[|r)op0');
define('SECURE_AUTH_KEY', '/1PpM*@KDHB;23*B6L+n)-aT68b@qD5u|xVYk2(1%T0T1Yp1Lq(wO7px2A&Pwlvo');
define('LOGGED_IN_KEY', ']6NZ%;09nP2*WXe4PzGdt!5aY+AOEB-f_Z]p79[YM9_Z&8xD+2+|)(CX:#KeqPo4');
define('NONCE_KEY', '1/FX;%+Pf*7ib0Lb-wY7]i9|f)AN+F|d|o/6!)znI7Qdr6gc~Bw90:V~7|3Y8Nf[');
define('AUTH_SALT', '5:&__y%i8U9;H2ML-7He4xg6G]34UXxl3R8M6[)9Vb1M213j!9ghB6BgM;zcosY~');
define('SECURE_AUTH_SALT', 'rISGTKULkH[~ykm/jN7bq36Wt-5x3dZbadk9NOr7J_LP4_l98zZ5y68C+!~9PtU5');
define('LOGGED_IN_SALT', '290;a;hKRti[vVQ-dHEH)I5H!|29v(88]y+2j%Y#+2HIw0~QCK!zqT/2jj|1-EFv');
define('NONCE_SALT', ']NJ(~&i6U|74%&vAj*N-X458pkA24;5xs8p3N)uKhw/I(#SYcF_JQ9ni6pg3]EmQ');


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'uYrZQ_';


/* Add any custom values between this line and the "stop editing" line. */

define('WP_ALLOW_MULTISITE', true);
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
