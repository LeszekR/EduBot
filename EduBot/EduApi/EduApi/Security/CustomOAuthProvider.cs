using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace EduApi.Security {


    // =================================================================================================
    public class CustomOAuthProvider : OAuthAuthorizationServerProvider {


        // PUBLIC
        // =============================================================================================
        public override Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context) {

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            var user = context.OwinContext.Get<edumaticEntities>().user.FirstOrDefault(
                u => u.login == context.UserName && u.password == context.Password
                );

            if (user == null) {
                context.SetError("invalid_grant", "The user name or password is incorrect");
                context.Rejected();
                return Task.FromResult<object>(null);
            }

            var ticket = new AuthenticationTicket(SetClaimsIdentity(context, user), new AuthenticationProperties());
            context.Validated(ticket);
            return Task.FromResult<object>(null);
        }


        // ---------------------------------------------------------------------------------------------
        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context) {
            context.Validated();
            return Task.FromResult<object>(null);
        }


        // PRIVATE
        // =============================================================================================
        private static ClaimsIdentity SetClaimsIdentity(OAuthGrantResourceOwnerCredentialsContext context, user user) {
            var identity = new ClaimsIdentity("JWT");
            identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
            identity.AddClaim(new Claim("sub", context.UserName));
            identity.AddClaim(new Claim(ClaimTypes.Role, user.role));
            //identity.AddClaim(new Claim("userId", user.id.ToString()));
            return identity;
        }
    }
}