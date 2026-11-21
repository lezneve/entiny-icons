# іконки entinygram — покриття

локальний todo звірено з kotlin, java та xml поточної робочої копії. усі 66 позицій із todo мають посилання в коді. додатково знайдено 4 tabler-іконки в java-хуках і 13 брендів із simple-icons.

## відповідь для клода

> перевірив entinyTodo/icons-missing.md за поточним кодом. усі 66 ресурсів із нього використовуються. 70 назв із todo та java-хуків тепер покриває пак: 18 готових svg, 3 перенесені з чернеток і 49 нових. 13 брендів із simple-icons уже були готові. окремо додав гривню, загалом у паку 166 іконок.
> у робочій копії вже є залежність entiny-icons і префікс entiny_ через filePrefix. таблиця нижче відповідає цій схемі. встановлена залежність v0.1.0 містить 113 іконок, а локальний пак — 166. lock-password ще є в AppIconCell.kt, хоча його вже прибрали з ICON_SETS; заміна — entiny_app_passcode.
> окремий dot і duotone не додав. крапки онлайн-статусу вже малює ChatAvatarPresenceHelper через canvas.drawCircle, а в списку стилів позначки видаленого повідомлення dot відсутній.

## відповідність ресурсів

це відповідність за змістом. для різних дій, що ділять стоковий ресурс, бери найближчий знак: appearance для дизайну, icon-pack для вибору паку, material-three для налаштувань material 3 та grid для сітки в маркеті. для цільової валюти uah у RatePairEditActivity є entiny_currency_hryvnia.

| поточний ресурс | ресурс із паку |
| --- | --- |
| `inu_bi_currency_dollar` | `entiny_currency_dollar` |
| `inu_bi_currency_euro` | `entiny_currency_euro` |
| `inu_bi_openai` | `entiny_openai` |
| `inu_bxl_groq_ai` | `entiny_groq_ai` |
| `inu_cryptocurrency_trx` | `entiny_trx` |
| `inu_lucide_activity` | `entiny_activity` |
| `inu_lucide_arrow_up_down` | `entiny_options_menu` |
| `inu_lucide_battery_charging` | `entiny_battery_charging` |
| `inu_lucide_camera` | `entiny_camera` |
| `inu_lucide_circle_dollar_sign` | `entiny_dollar_coin` |
| `inu_lucide_circle_plus` | `entiny_add` |
| `inu_lucide_circle_user` | `entiny_user_badge` |
| `inu_lucide_clipboard` | `entiny_clipboard` |
| `inu_lucide_clock` | `entiny_clock` |
| `inu_lucide_cloud` | `entiny_cloud` |
| `inu_lucide_cloud_download` | `entiny_backup_restore` |
| `inu_lucide_cloud_off` | `entiny_cloud_off` |
| `inu_lucide_code` | `entiny_code` |
| `inu_lucide_copy` | `entiny_copy` |
| `inu_lucide_credit_card` | `entiny_credit_card` |
| `inu_lucide_eye` | `entiny_eye` |
| `inu_lucide_eye_off` | `entiny_eye_off` |
| `inu_lucide_file_text` | `entiny_ai_summary` |
| `inu_lucide_funnel` | `entiny_regex_filter` |
| `inu_lucide_globe` | `entiny_globe` |
| `inu_lucide_heart` | `entiny_support` |
| `inu_lucide_house` | `entiny_home` |
| `inu_lucide_info` | `entiny_about` |
| `inu_lucide_italic` | `entiny_italic` |
| `inu_lucide_layers_2` | `entiny_layers` |
| `inu_lucide_layout_grid` | `entiny_grid` |
| `inu_lucide_layout_panel_left` | `entiny_side_menu` |
| `inu_lucide_layout_panel_top` | `entiny_chat_header` |
| `inu_lucide_letter_b` | `entiny_bold` |
| `inu_lucide_link` | `entiny_link` |
| `inu_lucide_list` | `entiny_compact_view` |
| `inu_lucide_message_circle` | `entiny_message_menu` |
| `inu_lucide_message_circle_more` | `entiny_chat_more` |
| `inu_lucide_message_square_text` | `entiny_message_design` |
| `inu_lucide_microchip` | `entiny_microchip` |
| `inu_lucide_palette` | `entiny_appearance` |
| `inu_lucide_phone` | `entiny_phone` |
| `inu_lucide_puzzle` | `entiny_plugins` |
| `inu_lucide_quote` | `entiny_quote` |
| `inu_lucide_remove_formatting` | `entiny_remove_formatting` |
| `inu_lucide_rotate_ccw_clock` | `entiny_backup_reset` |
| `inu_lucide_scissors` | `entiny_scissors` |
| `inu_lucide_search` | `entiny_search` |
| `inu_lucide_send` | `entiny_send` |
| `inu_lucide_server` | `entiny_server` |
| `inu_lucide_settings` | `entiny_app_controls` |
| `inu_lucide_shield_check` | `entiny_permissions` |
| `inu_lucide_signal` | `entiny_signal` |
| `inu_lucide_smile` | `entiny_smile` |
| `inu_lucide_sparkles` | `entiny_sparkles` |
| `inu_lucide_square_dashed_text` | `entiny_select_all` |
| `inu_lucide_strikethrough` | `entiny_strikethrough` |
| `inu_lucide_sun` | `entiny_sun` |
| `inu_lucide_terminal` | `entiny_terminal` |
| `inu_lucide_trash` | `entiny_trash` |
| `inu_lucide_triangle_exclamation_point` | `entiny_warning` |
| `inu_lucide_underline` | `entiny_underline` |
| `inu_lucide_user_x` | `entiny_user_x` |
| `inu_lucide_users` | `entiny_profile_accounts` |
| `inu_lucide_venetian_mask` | `entiny_paranoia` |
| `inu_simple_icons_bitcoin` | `entiny_bitcoin` |
| `inu_simple_icons_bnbchain` | `entiny_bnb_chain` |
| `inu_simple_icons_boosty` | `entiny_boosty` |
| `inu_simple_icons_cloudflare` | `entiny_cloudflare` |
| `inu_simple_icons_ethereum` | `entiny_ethereum` |
| `inu_simple_icons_github` | `entiny_github` |
| `inu_simple_icons_googlegemini` | `entiny_gemini` |
| `inu_simple_icons_openrouter` | `entiny_openrouter` |
| `inu_simple_icons_patreon` | `entiny_patreon` |
| `inu_simple_icons_solana` | `entiny_solana` |
| `inu_simple_icons_telegram` | `entiny_telegram` |
| `inu_simple_icons_tether` | `entiny_tether` |
| `inu_simple_icons_ton` | `entiny_ton` |
| `inu_tabler_circle` | `entiny_circle` |
| `inu_tabler_id` | `entiny_id_card` |
| `inu_tabler_lock_password` | `entiny_app_passcode` |
| `inu_tabler_text_wrap` | `entiny_text_wrap` |
| `inu_tabler_text_wrap_disabled` | `entiny_text_wrap_off` |

## згенеровані назви без прямих посилань

`inu_lucide_archive`, `inu_lucide_ban`, `inu_lucide_download`, `inu_lucide_key`, `inu_lucide_keyboard`, `inu_lucide_lock_keyhole`, `inu_lucide_mic`, `inu_lucide_smartphone`, `inu_lucide_upload`, `inu_lucide_user`, `inu_lucide_wifi`.

ці назви є в ICON_SETS, але прямих посилань у перевірених джерелах немає. перед видаленням перевір зовнішні паки й плагіни, які можуть завантажувати ресурси за назвою.

## референси брендів

[openai](https://openai.com/brand/) · [groq](https://groq.com/brand/Brand%20Mini-Style_Guidelines_v2.pdf) · [tron](https://tron.network/resources/)
