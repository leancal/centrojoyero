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
define( 'DB_NAME', 'metalamarillo_wp_cumfo' );

/** Database username */
define( 'DB_USER', 'metalamarillo_wp_fsalm' );

/** Database password */
define( 'DB_PASSWORD', '#69IO78!aAaVBfn4' );

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
define('AUTH_KEY', 'Db5;0LTK%7:%;oC/|wi67RLnaL6o!LhQf_Egg(0+P9&57|UZir5vtle!vl1w182A');
define('SECURE_AUTH_KEY', 'ba!Gn4j/U5;D9rn4EBN9i1vKy/0b/%!uZ|As#+QQu|D@cyl!7;v3R]dWn%:0Ds15');
define('LOGGED_IN_KEY', 'H(F;@t8@ze#871Z@_9ajgO11DB[HX9:||o4U0502Houj9|5]YaW!:+M0q0fp|23c');
define('NONCE_KEY', '8Nfv1V_1Rj)-xs:fMcy]FKP9LRS7v8pd7HIl9)2HJzRr|69&o#|P%3*xB6Skl5V6');
define('AUTH_SALT', '9t4E[I;A*0lU7FhRZL+#g3i6-!:]~_78G!iV9;9sFqWIueTK9w|1WId61@30mh;)');
define('SECURE_AUTH_SALT', 'RfXqfNJT4/B3p6t1qz+*#0%I*hg+Am826p-|82|M(G4O0H1BdcH97X)r73WGb8vR');
define('LOGGED_IN_SALT', '9X2(vfA&jA#L22sXx|f!H/NnOhBGc2&M(00!Rd%5i638y3d]:3R%Y0&b7W[2Ac+k');
define('NONCE_SALT', '8p1Z)8Jse@f(FPp-2p(yU;~+jj~]F]gjg6wa93zTy553(1iDOf095b8I2nG25@:%');


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'oyLTTb_';


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
