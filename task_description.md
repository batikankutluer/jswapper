# Devs HW#1

## **Uniswap V2 DEX Simülasyonu**

**Genel Gereksinimler**

1. **Konsol Uygulaması:** Uygulama tamamen konsolda çalışacak, herhangi bir HTML veya CSS kullanılmayacak.
2. **Dil ve Araçlar:** Sadece **JavaScript** ve **Node.js** kullanılacak. Opsiyonel Firebase kullanılacak. Commander ve Chalk kullanarak yaparsanız +++.
3. **Kullanıcı Girdisi:** Kullanıcı işlemleri konsol üzerinden gerçekleştirilecek. Commander bunun için kullanılacak.
4. **Veri Depolama:**

   • **Birinci seçenek:** Likidite havuzu ve kullanıcı bakiyeleri bir **JSON dosyasında** saklanacak.

   • **Opsiyonel:** Firebase kullanarak havuz ve kullanıcı verileri bulutta saklanabilir.

**Uygulama Fonksiyonları**

1. **Likidite Havuzu ve Kullanıcı Verileri:**

   • Havuz ve kullanıcı bakiyeleri başlangıçta sabit değerlerle başlatılacak:

   `let pool = { tokenA: 1000, tokenB: 1000, K: 1000000 };`

   `let userBalance = { tokenA: 500, tokenB: 500 };`

   • Veriler başlangıçta bir json dosyasından okunacak ve her işlem sonrası bu dosyaya yazılacak. Eğer firebase kullanıyorsan her app’e girişte user için yeniden token değerleri generate edilecek. Ama havuz 1 tane kalacak. Senkron işlem atılabildiğiniz göstermen gerekiyor.

2. **Kullanıcı Menüsü:**

   • Kullanıcı aşağıdaki seçeneklerden birini seçebilmeli:

   1. Likidite Ekle
   2. Swap (Token A -> Token B veya Token B -> Token A)
   3. Havuz Durumunu Görüntüle
   4. Kullanıcı Bakiyesini Görüntüle
   5. Çıkış

Not: Github üzerinde projenizi başlattığınızı ve birlikte çalıştığınızı commitleriniz üzerinden görebilmeliyim. Özenli bir şekilde kullanırsanız harika olur. İsteyenler TypeScript de kullanabilir.

Güncelleme: Commander yeterli değil ise Inquirer kullanabiliriz.\*
