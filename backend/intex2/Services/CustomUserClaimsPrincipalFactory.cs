using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace intex2.Services
{
    public class CustomUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<IdentityUser, IdentityRole>
    {
        public CustomUserClaimsPrincipalFactory(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IOptions<IdentityOptions> optionsAccessor)
            : base(userManager, roleManager, optionsAccessor) { }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(IdentityUser user)
        {
            // 🛡 Refetch the user to ensure all properties (like Email) are populated
            var fullUser = await UserManager.FindByIdAsync(user.Id);
            if (fullUser == null)
            {
                throw new Exception("User not found during claims generation.");
            }

            var identity = await base.GenerateClaimsAsync(fullUser);

            // ✅ Only add email claim if it exists
            if (!string.IsNullOrEmpty(fullUser.Email))
            {
                identity.AddClaim(new Claim(ClaimTypes.Email, fullUser.Email));
            }

            // 🐞 Debug log (you can remove this in production)
            Console.WriteLine($"[ClaimsFactory] Created claims for: {fullUser.Email}");

            return identity;
        }
    }
}
