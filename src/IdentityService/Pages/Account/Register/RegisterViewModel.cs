using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace IdentityService.Pages.Account.Register;

public class RegisterViewModel
{
    [Required]
    [EmailAddress]
    [Display(Name = "Email Address")]
    public string Email { get; set;}
    [Required]
    [DataType(DataType.Password)]
    [Display(Name = "Password")]
    [StringLength(15, ErrorMessage = "Please Enter a Valid Password Between 4 to 15 character",MinimumLength = 4)]
    public string Password { get; set;}
    [Required]
    [StringLength(100, ErrorMessage = "Please Enter a Valid Username Between 4 to 100 character",MinimumLength = 4)]
    [Display(Name = "User Name")]
    public string Username { get; set;}
    [Required] 
    [Display(Name = "Full Name")]
    public string FullName { get; set;}
    public string ReturnUrl { get; set;}
    public string Button { get; set;}
    
}
